<script>
// FIXME: ここでメニューを定義する slot 使用しない！
export default {};
</script>

<template>
  <section>
    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <div class="user-image"></div>
        </v-btn>
      </template>
      <v-list-item-group color="primary">
        <v-list>
          <v-list-item>
            <router-link to="/account/profile/1" class="menu-list"
              ><v-list-item-title>
                <v-icon class="icon">mdi-card-account-details-outline</v-icon>
                Kazuya
              </v-list-item-title>
            </router-link>
          </v-list-item>
          <div class="boder-line" />
          <v-list-item>
            <router-link to="/chat" class="menu-list">
              <v-list-item-title>
                <v-icon class="icon">mdi-chat-plus-outline</v-icon>
                チャット
              </v-list-item-title>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/manage" class="menu-list">
              <v-list-item-title>
                <v-icon class="icon">mdi-clipboard-multiple-outline</v-icon>
                案件管理
              </v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list>
      </v-list-item-group>
    </v-menu>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.left-user-menu {
  width: 100px;
  height: 100px;
  margin: 0;
  display: inline-block;
  background-color: rgba(26, 108, 26, 0.113);

  .user-image {
    @include user-image;
    width: 2.8rem;
    height: 2.6rem;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
