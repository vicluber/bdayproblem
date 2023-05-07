<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      The term paradox is enclosed in double double quotes because while the birthday paradox is commonly referred to as a paradox, it is actually a counterintuitive fact. With only 23 people, the probability of two people sharing the same birthday exceeds 50%.
    </h3>
    <p>In "Check it out" page you can check this fact by using data of Argentinian footbal teams from the FIFA (pulled from <a href="https://apifootball.com/">here</a>)</p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
