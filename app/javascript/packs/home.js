import Vue from 'vue'

var gekiTitle = new Vue({
    el: "#gekiTitle",
    data: {
        message: '',
    },
    updated: function() {
        document.title = this.message;
    }
});

var gekiPreview = new Vue({
    el: "#gekiPreview",
    data: {
        body: '',
    },
});

var gekiBody = new Vue({
    el: "#gekiBody",
    data: {
        body: '',
    },
    updated: function() {
        gekiPreview.body = this.body;
    }
});