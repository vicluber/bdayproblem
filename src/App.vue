<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Index from './components/Index.vue'
</script>
<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <Index />
      <nav>
        <RouterLink to="/">{{ $t("menu.home") }}</RouterLink>
        <RouterLink to="/bday">{{ $t("menu.checkitout") }}</RouterLink>
        <RouterLink to="/understanding">{{ $t("menu.understanding") }}</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

nav a {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 2px solid #007bff;
  border-radius: 25px;
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

nav a:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
  background: linear-gradient(45deg, #0056b3, #007bff);
}

nav a.router-link-exact-active {
  background: linear-gradient(45deg, #28a745, #20c997);
  border-color: #28a745;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

nav a.router-link-exact-active:hover {
  background: linear-gradient(45deg, #20c997, #28a745);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: center;
    margin-left: 0;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
    justify-content: flex-start;
  }
}
</style>
