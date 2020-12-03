<template>
  <h1 class="title">Solutions</h1>
</template>

<script>
import { GET_SOLUTIONS } from "../../store/modules/solution/actions.type";
import { ShowErrorMessage } from "../../common/alerts";
export default {
  data() {
    return {
      solutions: [],
    };
  },
  created() {
    this.$store
      .dispatch(GET_SOLUTIONS)
      .then(() => {
        this.solutions = this.$store.getters.getSolutions;
      })
      .catch((err) => {
        ShowErrorMessage(err.message);
      });
  },
};
</script>
