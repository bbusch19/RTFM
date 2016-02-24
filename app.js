angular.module('rtfmApp', ['ui.router', 'firebase'])

.constant('fb', {
  url: 'https://breidenrealtimeforum.firebaseio.com/'
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('threads', {
    url: '/threads',
    templateUrl: 'components/views/threads.html',
    controller: 'threadsCtrl',
    resolve: {
      threadsRef: function(threadService) {
        return threadService.getThreads();
      }
    }
  })
  .state('thread', {
    url: '/threads/:threadId',
    controller: 'threadCtrl',
    templateUrl: 'components/views/thread.html',
    resolve: {
      threadRef: function(threadService, $stateParams) {
        return threadService.getThread($stateParams.threadId)
      },
      commentsRef: function(threadService, $stateParams) {
        return threadService.getComments($stateParams.threadId);
      }
    }
  });

  $urlRouterProvider
  .otherwise('/threads')
})
