// TODO: Sign up as master (not slave)
define(function() {
  function MasterTaskManager(peer) {
    this.cachedCode = "";
    this.peer = peer;
  };

  MasterTaskManager.prototype.submitTask = function submitTask(rdds, targets) {
    this.peer.submitTask({
      code: this.cachedCode,
      rdds: rdds,
      targets: targets
    });
    this.cachedCode = "";
  };

  MasterTaskManager.prototype.recordCode = function recordCode(code) {
    this.cachedCode += "try {\n" + code + "\n} catch (_ignore_) { };\n";
  };
  return MasterTaskManager;
});
