const socket = io();

const imgpfp = 'https://images.unsplash.com/photo-1556220881-df28b44798ce?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=100&h=100&fit=crop&ixid=eyJhcHBfaWQiOjF9';

Vue.component('message', {
    props: ['message'],
    template: `<div class="message-parent"><img class="message-pfp" src="${imgpfp}"><div><span class="message-nickname">{{ message.author }}</span>\
<span class="message-time">{{ timestampstr }}</span><br>
<span class="message-text">{{ message.text }}</span></div></div>`,
    computed: {
        timestampstr: function() {
            return (new Date(this.message.timestamp)).toDateString();
        }
    }
});

const messages = new Vue({
    el: '#messages',
    data: {
        messages: [
        ]
    }
});

function addMessage(msg) {
    messages.messages.push(msg);
}

socket.on('chat message', (msg) => {
    addMessage(msg);
});

const app = new Vue({
    el: '#message-sender',
    data: {
        message: '',
        nickname: 'Joe'
    },
    methods: {
        sendMessage: function () {
            if (this.message == '' || this.nickname == '') return;
            socket.emit('chat message', {
                text: this.message,
                author: this.nickname
            });
            this.message = '';
        }
    }
});