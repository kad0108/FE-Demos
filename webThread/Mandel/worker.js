/* 
 * worker.js 
 */

importScripts("workerlib.js");

onmessage = function (task) {
	var workerResult = computeRow(task.data);//Compare with task obj, workerResult has the property "values".
	postMessage(workerResult);
}
