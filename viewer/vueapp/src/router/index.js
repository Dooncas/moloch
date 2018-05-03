import Vue from 'vue';
import Router from 'vue-router';
import Stats from '@/components/stats/Stats';
import Sessions from '@/components/sessions/Sessions';

Vue.use(Router);

/* eslint-disable no-undef */
const router = new Router({
  mode: 'history',
  base: MOLOCH_PATH,
  scrollBehavior: function (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        offset: { x: 0, y: 150 } // offset for navbars
      };
    }
  },
  routes: [
    {
      path: '/stats',
      name: 'Stats',
      component: Stats
    },
    {
      path: '/sessions',
      name: 'Sessions',
      component: Sessions
    }
  ]
});

router.beforeEach((to, from, next) => {
  // TODO update/remove as angular pages go away
  // loads the angular app pages (for now, anything but the stats page)
  if (!to.path.includes('stats') && !to.path.includes('sessions') && to.path !== '/') {
    location.reload();
  }

  let page = to.name || 'Moloch - ';
  let view = to.query.view ? ` - ${to.query.view}` : '';
  let expression = to.query.expression ? ` - ${to.query.expression}` : '';

  /* eslint-disable no-undef */
  let title = MOLOCH_TITLE_CONFIG.replace(/_page_/g, page)
    .replace(/( *_-expression|_expression)_/g, expression)
    .replace(/( *_-view|_view)_/g, view);

  document.title = title;

  next(); // complete route change
});

export default router;
