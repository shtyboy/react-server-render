// Hook for server
if (typeof require.ensure !== 'function') {
  require.ensure = function(dependencies, cb) {
      cb(require);
  };
}

module.exports = {
  path: '/(index(.html))',
  component: require('../containers/Main/Global'),
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], require => {
          cb(null, require('../containers/App'));
      }, 'index');
    }
  },
  childRoutes:[{
      path: '/login(.html)',
      getComponent(nextState, cb) {
        require.ensure([], function(require){
            cb(null, require('../containers/User/Login'));
        }, 'login');
      }
    }
  ]
};
