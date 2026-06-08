// HideUser.plugin.js

export default {
    name: "HideUser",

    onLoad() {
        const HIDDEN_UIDS = [
            "335447914237263873"
        ];

        const HIDDEN_NAMES = [
            "distance",
            "storm"
        ];

        const hideBlockedUsers = () => {
            const elements = document.querySelectorAll(`
                [role="listitem"],
                [class*="channel"],
                [class*="member"],
                [class*="result"],
                [class*="message"],
                [class*="user"]
            `);

            elements.forEach(el => {
                const text = (el.innerText || "").toLowerCase();
                const html = el.innerHTML || "";

                const uidMatch = HIDDEN_UIDS.some(uid => html.includes(uid));
                const nameMatch = HIDDEN_NAMES.some(name =>
                    text.includes(name.toLowerCase())
                );

                if (uidMatch || nameMatch) {
                    el.style.setProperty("display", "none", "important");
                    el.style.setProperty("visibility", "hidden", "important");
                    el.style.setProperty("height", "0", "important");
                    el.style.setProperty("overflow", "hidden", "important");
                }
            });
        };

        this.interval = setInterval(hideBlockedUsers, 100);

        this.observer = new MutationObserver(hideBlockedUsers);
        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        hideBlockedUsers();

        console.log("[HideUser] Loaded");
    },

    onUnload() {
        clearInterval(this.interval);

        if (this.observer) {
            this.observer.disconnect();
        }

        console.log("[HideUser] Unloaded");
    }
};