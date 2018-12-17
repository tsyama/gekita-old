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
        gekiPreview.body = gekiParser(this.body);
    },
    methods: {
        tabber: function(e) {
            e.preventDefault();
            var elem = e.target;
            var val = elem.value;
            var pos = elem.selectionStart;
            elem.value = val.substr(0, pos) + '\t' + val.substr(pos, val.length);
            elem.setSelectionRange(pos + 1, pos + 1);
        }
    }
});

function gekiParser(text)
{
    var lines = text.split("\n");

    var result = '';
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        result += lineParser(line);
    }
    return result;
}

function lineParser(line)
{
    if (line === '') {
        return '<tr><td colspan="2">　</td></tr>';
    }
    var titleCheck = line.match(/^# (.*)/);
    if (titleCheck) {
        return '<tr><td colspan="2"><p class="title">' + titleCheck[1] + '</p></td></tr>';
    }

    var dooCheck = line.match(/^\t(.*)/);
    if (dooCheck) {
        return '<tr><td colspan="2"><span>　' + dooCheck[1] + '</span></td></tr>'
    }
    var serifs = line.split("\t");
    if (serifs.length >= 2) {
        line = '<tr><td><span class="tag">' + serifs[0] + '</span></td><td><span>' + serifs[1] + '</span></td></tr>';
    }
    return line;
}