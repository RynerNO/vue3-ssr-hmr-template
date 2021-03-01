import buildApp from "./app"
const { app, store, router } = buildApp();

// @ts-ignore
const storeInitialState = window.INITIAL_DATA;

if (storeInitialState) {
  store.replaceState(storeInitialState);
}
app.mount("#app", true);
export default app;