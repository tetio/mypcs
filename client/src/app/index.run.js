(function() {
  'use strict';

  angular
    .module('pcsManagement')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
