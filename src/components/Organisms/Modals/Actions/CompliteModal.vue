<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <div class="content">
            <v-icon class="icon">mdi-check-underline-circle-outline</v-icon>
            <p class="mt-2 mx-auto text-center">応募が完了しました</p>
            <p class="px-2 text-center">
              投稿者から参加許可をされたら<br />
              <span class="alert">チャットに参加できます。</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $modal-background;
  background-color: $white;
}

.modal-window {
  background: $white;
  border-radius: 8px;
  overflow: hidden;
}

.modal-content {
  margin: 0 auto;
  min-width: 320px;
  max-width: 480px;

  .content {
    margin: 0 auto;
    padding: 1rem 0rem;

    .alert {
      color: $error-message-color;
    }
  }

  .icon {
    color: $primary-color;
    font-size: 6em;
    margin-right: 7rem;
  }
}

.modal-footer {
  width: 80%;
  // padding: 1rem;
  text-align: right;
  display: inline-block;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;
}

.modal-enter-active,
.modal-window {
  transition: opacity 0.4s, transform 0.4s;
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
