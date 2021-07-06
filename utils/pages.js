module.exports = {
  thisPage() {
    return getCurrentPages().pop()
  },
  
  lastPage() {
    return getCurrentPages().slice(-2, -1)[0]
  },

  allPage() {
    return getCurrentPages()
  }
}