define(["rdd/rdd", "underscore"], function(RDD, _) {
  // TODO: one to many?
  return RDD.implement({
    init: function(parent, fn) {
      this.parent = parent;
      this.fn = fn;
    },
    getPartitions: function() {
      var that = this;
      return _.map(this.parent.partitions, function(parent, index)  {
        return new RDD.Partition(that, index, parent);
      });
    },
    compute: function(taskContext, partition, processor) {
      var that = this;
      partition.dependencies[0].iterate(taskContext, {
        process: function(item) {
          _.each(that.fn(item), function(piece) {
            processor.process(piece);
          });
        },
        done: function() { processor.done() }
      });
    },
  });
});
