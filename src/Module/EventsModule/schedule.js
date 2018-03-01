import utilModule from '../utilModule'

/*
 * Utility for running tasks periodically with equality check.
 * @memberof module:eventsModule
 */
const Schedule = {
  /*
   * Currently running tasks map
   * @type {object.<string, {interval: number, lastResult: object|null}>}
   */
  tasks: {},

  /*
   * Runs given task function periodically.
   * @param {string} key Unique task key
   * @param {function():Promise} taskFunc Task function
   * @param {function(mixed)} resultHandler Called with task result
   * @param {number} interval Task interval (in milliseconds)
   * @param {boolean} checkEquality Compare current and last result, don't call resultHandler if both are equal
   */
  periodically(key, taskFunc, resultHandler, { interval, checkEquality }) {
    if (this.tasks.hasOwnProperty(key)) {
      return
    }

    this.tasks[key] = {
      /**
       * Task runner interval
       */
      interval: setInterval(() => {
        const task = this.tasks[key]

        taskFunc()
          .then(result => {
            if (
              !(checkEquality && utilModule.equals(task.lastResult, result))
            ) {
              resultHandler(result)
            }

            if (checkEquality) {
              // result needs to be cloned as it could be modified in further processing
              task.lastResult = utilModule.clone(result)
            }
          })
          .catch(error => console.error(error))
      }, interval),

      /**
       * Last result pointer for equality check
       */
      lastResult: null,
    }
  },

  /*
   * Stops given task.
   * @param {string} key Task key
   */
  stop(key) {
    if (!this.tasks.hasOwnProperty(key)) {
      return
    }

    clearInterval(this.tasks[key].interval)
    delete this.tasks[key]
  },
}

export default Schedule
