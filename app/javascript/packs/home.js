import Vue from 'vue';
import axios from 'axios';

var castList = [];
var contentStartFlag = false;

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
        addTagClass();
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

var pdfBtn = new Vue({
    el: "#pdfBtn",
    methods: {
        toPdf: function() {
            window.print();
        }
    }
});

function gekiParser(text)
{
    contentStartFlag = false;
    castList = [];
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
        if (contentStartFlag) {
            return '<tr><td colspan="2">　</td></tr>';
        } else {
            return '';
        }
    }
    var castCheck = line.match(/^= (.*)\t(.*)/);
    if (castCheck) {
        castList.push({
            cast: castCheck[1],
            className: castCheck[2]
        });
        return '';
    }

    var titleCheck = line.match(/^# (.*)/);
    if (titleCheck) {
        contentStartFlag = true;
        return '<tr><td colspan="2"><p class="title">' + titleCheck[1] + '</p></td></tr>';
    }
    var dooCheck = line.match(/^\t(.*)/);
    if (dooCheck) {
        contentStartFlag = true;
        return '<tr><td colspan="2" class="doo"><span>' + dooCheck[1] + '</span></td></tr>'
    }
    var serifs = line.split("\t");
    if (serifs.length >= 2) {
        contentStartFlag = true;
        var castTagClass = getCastTagClass(serifs[0]);
        line = '<tr><td><span class="tag ' + (castTagClass ? castTagClass : '') + '" name="' + serifs[0] + '">' + serifs[0] + '</span></td><td class="serif"><span>' + serifs[1] + '</span></td></tr>';
    }

    return line;
}

function addTagClass()
{
    for (var i = 0; i < castList.length; i++) {
        var cast = castList[i];
        var castTags = document.getElementsByName(cast.cast);
        castTags.forEach(function(tag) {
            if (!tag.classList.contains(cast.className)) {
                tag.classList.add(cast.className);
            }
        });
    }
}

function getCastTagClass(castName)
{
    for (var i = 0; i < castList.length; i++) {
        var cast = castList[i];
        if (cast.cast === castName) {
            return cast.className;
        }
    }
    return null;
}