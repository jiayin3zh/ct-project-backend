const Modules = {
    loadModule: function(moduleId, container) {
        const template = document.getElementById(moduleId);
        if (template) {
            const clone = template.content.cloneNode(true);
            container.appendChild(clone);
        }
    },
};
