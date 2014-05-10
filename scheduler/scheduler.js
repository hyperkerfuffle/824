function Scheduler(server){
  this.server = server;
  // this object represents a map of work to time
  // it is used to do timeout analysis 
  this.mapWorkToTime = {}; 
  // this represents how long it takes before we timeout a variable
  this.timeOutTime = 1000;

  // this map is used to map a parition to whatever is dependent on it
  // it is an array of a partition id to what is dependent on it
  this.mapPartitionToParent = {};

  // this is a map of partition id to whatever is dependent on it
  this.mapPartitionToChildren = {}; 

  // maps sequence number to status
  this.sequenceNumbers = {}

}

Scheduler.prototype = {

  //this function will remove a value from an array
  RemoveFromArray: function(arr1, value) {
    index = arr1.indexOf(value);
    if (index > -1) {
      newarray = arr1.splice(index,1);
    }
    return newarray;
  }

  // this function is responsible for removing nodes from the mapPartitiontoParent
  //that do not have any parents so we can get some vertices to start with 
  Initialize: function(partitionlist) {
    for (var i = 0; i<partitionlist.length; i++) {
      partition = partition[i];
 	if (this.mapPartitionToParent[partition].length == 0) {
          delete this.mapPartitionToParent(partition);
	} 

     }

  }

  // this function is responsible for removing nodes from the graph
  // we go through all of its children and remove the dependency of that child in the parent graph
  // if the child no longer has any parents, we remove it from the mapPartitionToParent
  // nodes are free to be assigned if they are not in the mapPartitionToParent but in the other map 
  RemoveNode: function(partition) {
	var children = this.mapPartitionToChildren[partition];
        for (var i = 0; i < children.length; i++) {
		child = children[i];
                this.mapPartitionToParent[child] = RemoveFromArray(this.mapPartitionToParent[child], partition)
                if (this.mapPartitionToParent[child].length == 0) {
		   delete this.mapPartitionToParent(child);
		} 
	}
        delete this.mapPartitionToChildren[partition];   
  }


  RemoveTask: function(task) {
    for (var i = 0; i < task.nodes.length; i++) {
      RemoveNode(task.nodes[i]);
    } 		  
  }  

  //the code that finishes the task 
  FinishTask: function(workerId, task) {
      // code when one receives a new task Id
      var currentTime =  new Date().getTime();
      this.mapWorkToTime[workerId] = currentTime
      RemoveTask(task)
    	
  }
  //iterate through all the partitions
  // finds the first one that does not have any partitions
  // this needs to be finished
  AssignTask: function(workerId, task, partitionList) {
     // code for actually assigned a workerto a given task
  
  }

  //Builds partition dependencies based on json object 
  //See example-submission.json
  BuildDependencyTree: function(submission) {
    var json = JSON.parse(submission);
    
    //Check if this submission has already been added
    if !(json.seq in this.sequenceNumbers) {
      for (var i = 0; i < json.rdds.length; i++) {
        var rdd = json.rdds[i];  

        for (var j = 0; j < rdd.length; j++) {
          var partition = rdd[j];
          //Build node <- parents relationships
          if !(partition.id in this.mapPartitionToParent) {
            this.mapPartitionToParent[partition.id] = partition.dependencies;
          } else {
            this.mapPartitionToParent[partition.id] = Array.prototype.push.apply(this.mapPartitionToParent[partition.id], partition.dependencies);
          }  

	  //Build node <- children relationships
          for (var k = 0; k < partition.dependencies.length; k ++) {
            var dependency = partition.dependencies[k];
            if !(dependency in this.mapPartitionToChildren) {
              this.mapPartitionToChildren[dependency] = [partition.id];
            } else {
              this.mapPartitionToChilrden[dependency] = this.mapPartitionToChildren.push(partition.id);
            }
          }

        }
      }    
      this.sequenceNumbers[json.seq] = //ADDED?
    } 

  }

};

// this is a task class which represents a task

// the source is the partition that is in the    
// the sink is the last partition to analyze
// the nodes is a list of partitions for the worker to analyze
    
function Task(sources, sink, nodes) 
  this.source = source;
  this.sink = sink; 
  this.nodes = nodes;
}

// the time that it currently is
function getTime() {
   var currentTime =  new Date().getTime();
}


//this method is responsible for 
function alterTime() {
   for (var key in mapWorkToTime) {
	oldTime = mapWorkToTime[key];
	if (getTime() > oldTime + timeOutTime) {
	   console.log("we have done the appropriate log out time")
	}
   }
}


