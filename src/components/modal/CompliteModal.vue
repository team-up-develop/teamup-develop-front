<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <slot/>
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <!-- <button @click="$emit('close')">Close</button> -->
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

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
  font-weight: bold;
  background-color: $basic-white;
}

.modal-window {
  background: $basic-white;
  border-radius: 8px;
  overflow: hidden;
}

.modal-content {
  padding: 4rem 6rem;
}

.modal-footer {
  width: 80%;
  // padding: 1rem;
  text-align: right;
  display: inline-block;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;
}

.modal-enter-active, .modal-window {
  transition: opacity 0.4s, transform 0.4s;
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}

.modal-enter, .modal-window {
  transform: translateY(-20px);
}
</style>