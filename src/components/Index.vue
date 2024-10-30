<script>
export default {
  data () {
    return { lang: 'es' }
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'es' : 'en';
      this.lang = this.lang === 'es' ? 'en' : 'es';
    }
  }
}
</script>

<template>
  <div class="lang-selector pb-5">
    <img class="flag me-2" :class="{ active: this.lang == 'es' }" src="https://flagicons.lipis.dev/flags/4x3/es.svg" @click="changeLanguage()" />
    <img class="flag me-2" :class="{ active: this.lang == 'en' }" src="https://flagicons.lipis.dev/flags/4x3/um.svg" @click="changeLanguage()" />
  </div>
  <div class="greetings">
    <h1 class="green">{{ $t("index.title") }}</h1>
    <h3>
      {{ $t("index.subjectDescription") }}
    </h3>
    <p v-html="$t('index.siteInstructions')"></p>
  </div>

</template>

<style scoped>
.flag {
  filter: grayscale(1);
  cursor: pointer;
  width: 30px;
  height: 30px;
}
.flag.active {
  filter: grayscale(0);
}
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
