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
    <template #heading>The question</template>

    In a group of people, how many people do you think is necessary in order ot have two of them sharing their birthdate?
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <AsterskIcon />
    </template>
    <template #heading>23</template>

    With a group of 23 people you manage a 50% chance that two of them share their birthdate.

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <AsterskIcon />
    </template>
    <template #heading>40</template>

    With a group of 40 people you get a 89.1% of probability.
    So next time you are having a family dinner, think that if there is 40 of you there, think on their birthdays and you maight find two the same day.

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <AsterskIcon />
    </template>
    <template #heading>60</template>

    With 60 and a 99.4% you can bet that two of them will share thei birthdate.
    

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Ant the maths for it are not that complicated</template>
    You can try to grasp de fact from <a href="/understanding">here</a>.
    (365/365) x (365/364) x (365/363) x  (365/362)... = 0.4927 = 49.27% of them not sharing their birthdates which means 50.73% they do.
  </WelcomeItem>
</template>
