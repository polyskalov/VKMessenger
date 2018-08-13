<script>
import Conversations from './Conversations';
import Conversation from './Conversation';

export default {
    components: {
        Conversations,
        Conversation
    }
}
</script>

<template>
    <div class="im-container">
        <conversations></conversations>
        <conversation></conversation>
    </div>
</template>

<style>
.im-container {
    display: flex;
    flex-grow: 1;
	background: #fff;
	border-radius: 3px;
	box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
	height: 90vh;
	margin: 20px auto;
	overflow: hidden;
	max-width: 1000px;
}
</style>
