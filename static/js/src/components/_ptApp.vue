<template>
    <div class="tableWrap">
        <PeriodicTable/>
    </div>
</template>

<script>
import PeriodicTable from "./home/PeriodicTable";

export default {
    name: "Home",
    components: {
        PeriodicTable,
    }
};
</script>

<style lang="scss">
body {
    margin: 0;
}
.application.theme--dark {
    background: rgb(26, 31, 44) !important;
}
.application .theme--dark.v-navigation-drawer .v-divider,
.application
    .theme--dark.v-navigation-drawer:not(.v-navigation-drawer--floating)
    .v-navigation-drawer__border,
.theme--dark .v-navigation-drawer .v-divider,
.theme--dark
    .v-navigation-drawer:not(.v-navigation-drawer--floating)
    .v-navigation-drawer__border {
    background: none;
}
.tableWrap {
    width: 88.1%;
    margin-left: auto;
    margin-right: auto;
    clear: both;
    padding-bottom: 4vw;
}
.footerWrap {
    width: 100%;
}
@media only screen and (max-width: 600px) {
    .tableWrap {
        width: 100%;
        overflow: scroll;
        clear: both;
        padding-bottom: 4vw;
    }
}
</style>