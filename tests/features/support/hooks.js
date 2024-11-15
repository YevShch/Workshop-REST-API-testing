import chalk from 'chalk';
import {
  BeforeAll, AfterAll, Before, After,
  BeforeStep, AfterStep, setDefinitionFunctionWrapper
} from "@cucumber/cucumber";

// We create our own logging system using hooks!
// (Chalk is a nom module used to color text output to the terminal)
const stepTextMaxLength = 90;

// Types translation
const types = {
  Context: 'Given',
  Action: ' When',
  Outcome: ' Then'
}

// Counters 
let steps = 0, scenarios = 0, failedScenarios = 0, stepsInScenario = 0;

// Before each scenario
Before(function ___(info) {
  stepsInScenario = 0;
  let { name, description } = info.gherkinDocument.feature;
  let { name: scenario } = info.pickle;
  if (this.__skip !== scenario) {
    this.__skip = false;
  }
  if (this.__skip) { return; }
  console.log(chalk.greenBright('Feature:'), chalk.green(name));
  console.log(chalk.whiteBright(description.trim()));
  console.log('');
  console.log(chalk.blueBright((scenarios + 1) + '. Scenario:'), chalk.blue(scenario));
});

// After each scenario
let latestAfterInfo;
After(function ___(info) {
  latestAfterInfo = info;
  let { name: scenario } = info.pickle;
  if (!this.__skip) {
    console.log('');
    scenarios++;
    let { exception } = info.result;
    if (exception) {
      failedScenarios++;
      let { type, message } = exception;
      console.log(chalk.redBright(type + ':'), chalk.redBright(message), '\n');
    }
  }
  if (this.__skipAllRemainingRuns) {
    this.__skip = scenario;
    this.__skipAllRemainingRuns = false;
  }
});

// Before each step
BeforeStep(function ___(info) {
  if (this.__skip) { return; }
  this.stepText = info.pickleStep.text;
});

// After each step
let prevType = '';
AfterStep(function ___(info) {
  if (this.__skip) { return; }
  steps++;
  stepsInScenario++;
  let { type, text } = info.pickleStep;

  // Replace text from feature with text set by step if there is any
  if (this.customStepText) {
    text = this.customStepText;
    delete this.customStepText;
  }

  let { status: result } = info.result;
  let strings = [];
  text = text.padEnd(stepTextMaxLength, ' ').slice(0, stepTextMaxLength);
  text = text.replace(/"[^"]*"/g, (str) => {
    strings.push(str);
    return "---string---";
  });
  text = text.replace(/\d{1,}/g, (num) => {
    return chalk.yellowBright(num);
  });
  text = text.replace(/---string---/g, () => {
    return chalk.cyanBright(strings.shift());
  });
  console.log(
    chalk.greenBright(prevType === type ? '  And' : types[type]),
    chalk.whiteBright(text),
    chalk[result === 'PASSED' ? 'greenBright' : 'redBright'](result)
  );
  prevType = type;
});

let startTime;
BeforeAll(function ___() {
  startTime = Date.now();
});

AfterAll(function ___() {
  console.log('-'.repeat(stepTextMaxLength + 16) + '\n');
  console.log(
    chalk.yellowBright(scenarios), chalk.whiteBright('scenarios'),
    `(${failedScenarios ? chalk.redBright(failedScenarios + ' failed, ') : ''}` +
    `${chalk.greenBright(`${scenarios - failedScenarios} passed`)})`
  );
  console.log(chalk.yellowBright(steps), chalk.whiteBright('steps'));
  console.log(
    chalk.whiteBright('Time taken:'),
    chalk.yellowBright(((Date.now() - startTime) / 1000).toFixed(2)),
    chalk.whiteBright('seconds'), '\n'
  );
  if (stepsInScenario > 0 && latestAfterInfo.pickle.steps.length > stepsInScenario) {
    console.log(chalk.redBright("Missing steps:\n"),
      chalk.yellowBright(latestAfterInfo.pickle.steps.slice(stepsInScenario)
        .map(x => types[x.type].trim() + ' ' + x.text).join('\n')));
  }
  process.exit();
});

// For our dynamic scenario outlines
// keep track of when the array used for "examples" has been emptied
setDefinitionFunctionWrapper(function (fn) {
  return async function (...args) {
    if (this.__skip && fn.name !== '___') { return; }
    let co = 0;
    for (let arg of args) {
      if (typeof arg !== 'string') { continue; }
      let vars = [];
      arg.replace(/\{[^\}]*/, x => vars.push(x.slice(1)));
      vars = vars.filter(x => (this[x + 's'] || this[x]) instanceof Array);
      vars.forEach(x => {
        arg = arg.replace(`{${x}}`, (this[x + 's'] || this[x]).shift());
        (this[x + 's'] || this[x]).length === 0 && (this.__skipAllRemainingRuns = true);
      });
      this.customStepText = this.stepText.replaceAll(args[co], arg);
      args[co] = arg;
      co++;
    }
    await fn.apply(this, args);
  }
});