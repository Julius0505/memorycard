<template>
    <div>
        <div class="shadow"></div>
        <section class="modal">
            <h2>{{ title }}</h2>
            <p>{{ message }}</p>
            <button @click="close">Close</button>
        </section>
    </div>
</template>

<script>
export default {
    props: [
        'title',
        'message'
    ],
    methods: {
        close() {
            this.$emit('closed');
        }
    }
}
</script>

<style lang="scss" scoped>
.shadow {
    background: black;
    opacity: 0.6;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: black;
    border-radius: 3px;
    padding: 15px;
    box-shadow: 0 0 5px gray;

    button {
        cursor: pointer;
    }
}
</style>