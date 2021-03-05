class List {
    constructor(name) {
        this.name = name;
        this.iniData();
    }

    add(payload) {
        const object = {
            id: Date.now(),
            ...payload
        };
        this.data.push(object);
        this.save();
    }
    remove(id) {
        this.data = this.data.filter(x => x.id !== id);
        this.save();
    }
    update(id, payload) {
        this.data = this.data.map(x => {
            if (x.id !== id) {
                return x;
            }

            return {
                ...x,
                ...payload
            };
        });
        this.save();
    }
    save() {
        const jsonData = JSON.stringify(this.data);
        localStorage.setItem(this.name, jsonData);
    }
    iniData() {
        const jsonData = localStorage.getItem(this.name);
        this.data = JSON.parse(jsonData) || [];
    }
}


class TodoList extends List {
    add(text) {
        const note = {
            isComplete: false,
            value: text
        };
        super.add(note);
    }
    update(id, text) {
        super.update(id, { value: text});
    }
    setComplete(id) {
        this.data = this.data.map(x => {
            if (x.id ===id) {
                x.isComplete = true;
            }

            return x;
        });
        this.save();
    }
    get statistic() {
        const complete = this.data.filter(x => Boolean(x.isComplete)).length;

        return {
            complete,
            total: this.data.length
        };
    }
}
TodoList();



