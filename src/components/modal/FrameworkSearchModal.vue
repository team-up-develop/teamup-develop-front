<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <v-card-title class="headline grey lighten-2">
          <span>フレームワーク</span>
        </v-card-title>
        <v-card-text class="modal-content">
          <slot/>
        </v-card-text>
        <footer class="modal-footer">
          <slot name="footer">
            <button @click="$emit('close')">Close</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 3000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $modal-background;

  /* font-weight: bold; */
}

.modal-window {
  background: $basic-white;
  border-radius: 8px;
  overflow: hidden;
}

.modal-content {
  padding: 1rem 1rem;
  overflow: scroll;
  height: 500px;
}

.modal-footer {
  width: 100%;
  padding: 0rem 2rem 1rem 0;
  text-align: right;
  display: inline-block;
  position: relative;
  font-size: 100px;
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

span {
  font-weight: bold;
}

@media screen and (max-width: 700px) {

}
</style>