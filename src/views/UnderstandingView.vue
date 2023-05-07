<template>
  <div class="about">
    <p>For better understanding, it is easier to pose the problem backwards and look for the probability of two people not sharing the same birthdate. For the sake of this problem, we will live in a world where the earth takes just 10 days to go around the sun and there are no months. So we have two people in a 10-day year, with no months, and we are looking for the probability of these two people not sharing the same birthdate.</p>
    <p>If one of them is born on a certain day, how many optional days does the other person have in order not to share the same birthdate? Nine, right? There are nine days on which the second person could be born and not share a birthdate with the first person. So the chance of not sharing a birthdate is 9/10, or 0.9, which is equivalent to a 90% probability.</p>
    <p>Now, let's add a third person to the problem. What is the chance that this third person does not share their birthdate with the first two? If the first two people already took two days of our 10-day year, the third person can be born on any of the remaining 8 days. So the probability of not sharing a birthdate with the other two would be 8/10, or 0.8, which is equivalent to an 80% probability. Then, just by subtraction, you can calculate the chance that the third person shares a birthdate with the other two. If there is an 80% chance of not sharing, that means there is a 20% chance of sharing. By using the <a href="https://www.youtube.com/watch?v=uvU4A2u_pAc">Multiplication Rules of Probability</a>, you can get the probability of three people not sharing their birthdates in a 10-day year: (10/10) x (9/10) x (8/10) = 0.72 = 72%.</p>
    <p>Now, let's do the same thing with a 365-day year and 23 people. The probability of them not sharing their birthdates is (365/365) x (365/364) x (365/363) x (365/362) ... = 0.4927 = 49.27%, which means that 50.73% of them do share a birthdate.</p>
    <p><a href="https://www.youtube.com/watch?v=KtT_cgMzHx8">This video</a> made it clear enoght for me.</p>
  </div>
</template>

<style>
</style>
<script>
export default {
  data() {
    return {
      dataArray: []
    }
  },
}
</script>