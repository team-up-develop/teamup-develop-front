<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-top">
          <p></p>
        </div>
        <div class="modal-content">
          <slot/>
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button @click="$emit('close')">Close</button>
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
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $modal-background;
  font-weight: bold;
}

.modal-window {
  background: $basic-white;
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
  background-color: $sub-white;
  border-bottom: dashed 2px $card-border-color;
}

.modal-content {
  position: relative;
  padding: 5rem 6rem 4rem 6rem;
}

.modal-footer {
  width: 87%;
  padding: 1rem;
  margin-left: 0.35rem;
  text-align: right;
  display: inline-block;
  position: relative;
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