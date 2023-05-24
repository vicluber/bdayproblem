<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import AsterskIcon from './icons/IconAsterisk.vue'
import QuestionIcon from './icons/IconQuestionMark.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <QuestionIcon />
    </template>
    <template #heading>{{ $t("theWelcome.first.title") }}</template>
    {{ $t("theWelcome.first.content") }}
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <AsterskIcon />
    </template>
    <template #heading>{{ $t("theWelcome.second.title") }}</template>
    {{ $t("theWelcome.second.content") }}
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <AsterskIcon />
    </template>
    <template #heading>{{ $t("theWelcome.third.title") }}</template>
    {{ $t("theWelcome.third.content") }}
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <AsterskIcon />
    </template>
    <template #heading>{{ $t("theWelcome.fourth.title") }}</template>
    {{ $t("theWelcome.fourth.content") }}
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>{{ $t("theWelcome.fifth.title") }}</template>
    <p v-html="$t('theWelcome.fifth.content')"></p>
  </WelcomeItem>
</template>
