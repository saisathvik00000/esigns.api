<template>
  <li class="menu-item" v-if="!hasChildren">
    <router-link :to="menu.route" exact>
      <span v-if="menu.icon">
        <img
          v-if="menu.icon"
          :src="require('@/assets/img/icons/menu/' + menu.icon)"
          alt="menu"
        />
        <img
          v-else
          alt="menu"
          src="@/assets/img/icons/menu/dashboard.svg"
          width="30"
        />
      </span>
      <span class="menu-title">{{ menu.title }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  /**
   * Components Name.
   *
   * @type {String}
   */
  name: "MenuTree",

  /**
   * Components properties.
   *
   * @type {Object}
   */
  props: {
    /**
     * Menu props for items.
     * @type {Object|Array}
     */
    menu: {
      type: [Array, Object],
      required: true,
    },
  },

  /**
   * Components computed properties.
   *
   * @type {Object}
   */
  computed: {
    /**
     * Determine if we have children or not.
     * @return {boolean}
     */
    hasChildren() {
      return this.menu.children && this.menu.children.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-item {
  list-style: none;
  a {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
    &.router-link-exact-active {
      background: #ecf5ff;
    }
  }

  span {
    display: inline-block;

    img {
      height: 30px;
      width: 30px;
      object-fit: contain;
    }

    &:first-child {
      margin-right: 5px;
      margin-left: 5px;
    }
  }
}
</style>