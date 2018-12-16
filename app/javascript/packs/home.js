import Vue from 'vue'

var gekiTitle = new Vue({
    el: "#gekiTitle",
    data: {
        message: '',
    },
    updated: function() {
        document.title = this.message;
    }
})