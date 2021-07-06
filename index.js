
class Cs {
  constructor(app=getApp()) {
    this.app = app
    this.loadModules()
  }
  
  loadModules() {
    const modules = {};
    ['login/index','requests/index','utils/index']
      .forEach(a => Object.assign(modules,require(a)));
    Object.keys(modules).forEach(k => modules[k].bind(this))
    Object.assign(Cs.prototype, modules)
  }
}

export default Cs;