<script lang="ts">
import { defineComponent, PropType, computed } from "@vue/composition-api";
import { truncate } from "@/hooks/useUtils";
import { ApplyUsersStatus } from "@/components/Templates/Manages/StatusChanges.vue";
import { VButton } from "@/components/Atoms";

export default defineComponent({
  components: {
    VButton,
  },
  props: {
    jobId: { type: Number as PropType<number>, default: 0, required: true },
    applyUsersStatus: {
      type: Object as PropType<ApplyUsersStatus["applyUsersStatus"]>,
    },
  },
  setup: (props) => {
    return {
      truncate,
      link: computed(() => `/jobs/${props.jobId}/detail`),
    };
  },
});
</script>
<template>
  <section>
    <v-card class="card">
      <v-col>
        <v-row class="card__top">
          {{ truncate(applyUsersStatus.jobTitle, 50) }}
        </v-row>
        <v-row class="card__center pt-4">
          <VButton class="detail-btn" :to="link" bc="primary" size="md">
            詳細をみる
          </VButton>
          <v-row class="pt-8">
            <div class="value">
              <div class="num">{{ applyUsersStatus.applyUsersNumber }}</div>
              <label for="name">応募数</label>
            </div>
            <div class="value">
              <div class="num">{{ applyUsersStatus.assignUsersNumber }}</div>
              <label for="name">参加数</label>
            </div>
            <div class="value">
              <div class="num">{{ applyUsersStatus.rejectUsersNumber }}</div>
              <label for="name">拒否数</label>
            </div>
          </v-row>
        </v-row>
      </v-col>
    </v-card>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
section {
  width: 30%;

  @media screen and (max-width: $la) {
    width: 100%;
  }
}
.card {
  width: 360px;
  min-width: 300px;
  height: 248px;
  padding: 1rem 1.2rem;
  border-radius: 8px;

  @media screen and (max-width: $la) {
    margin: 0 auto;
    width: 85%;
    margin-bottom: 1.5rem;
  }

  @media screen and (max-width: $me) {
    width: 95%;
  }

  &__top {
    padding: 0.2rem 0 0 0rem;
    height: 90px;
  }

  &__center {
    height: 120px;

    .detail-btn {
      width: 100%;
    }

    .value {
      width: 33%;

      .num {
        font-size: 1.5em;
      }
    }
  }
}
</style>
