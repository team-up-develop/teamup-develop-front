<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <slot />
        </div>
        <footer class="modal-footer">
          <slot name="btnArea">
            <button @click="$emit('close')">Close</button>
          </slot>
        </footer>
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
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $modal-background;
  font-weight: bold;
}

.modal-window {
  background: $white;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.modal-top {
  width: 100%;
  height: 42px;
  position: absolute;
  top: 0;
  margin-bottom: 2rem;
  background-color: $dark-white;
  border-bottom: dashed 2px $card-border-color;
}

.modal-content {
  margin: 0 auto;
  min-width: 400px;
  max-width: 420px;
  padding: 1rem 2rem;

  @media screen and (max-width: $ti) {
    padding: 1rem 1rem;
    min-width: 350px;
  }
}

.modal-footer {
  min-height: 60px;
  text-align: right;
  display: inline-block;
  position: relative;

  // @media screen and (max-width: $sm) {
  //   width: 100%;
  // }
  // @media screen and (max-width: $ti) {
  //   padding: 1rem 0rem;
  // }
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

.modal-enter,
.modal-window {
  transform: translateY(-20px);
}
</style>
