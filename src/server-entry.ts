import buildApp from "./app"
const { app, store, router } = buildApp();

export default (url: string) => new Promise((resolve, reject) => {
    // set server-side router"s location
    router.push(url);   
  
    router.isReady()
      .then(() => {
        const matchedComponents = router.currentRoute.value.matched;
        // no matched routes, reject with 404
        if (!matchedComponents.length) {
          router.push("/").then(() => {
            return resolve({ app, router, store });
          })
          return;
        }
  
        // the Promise should resolve to the app instance so it can be rendered
        return resolve({ app, router, store });
      }).catch(() => reject);
  }); 