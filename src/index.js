class List {
    notes = [];
    addNote(text) {
        const note = {
            text,
            id: Date.now(),
            isComplete: false,
        };
        const find = this.notes.find((el) => el.text === text);
        if (!find) {

            this.notes.push(note);
        } else {
            return 'Уже есть';
        }
    }
    getNoteIndexById(id) {
        return this.notes.findIndex((el) => el.id === id);
    }
    removeNote(id, asker = confirm('Вы уверены?')) {
        const VALUE_SPLICE = 1;
        if (asker) {
            const index = this.getNoteIndexById(id);
            this.notes.splice(index, VALUE_SPLICE);
        }
    }
    updateNoteText(id, text, asker = confirm('Вы уверены?')) {
        const find = this.notes.find((el) => el.text === text);
        if ((asker) && (!find)) {
            const index = this.getNoteIndexById(id);
            this.notes[index].text = text;
        } else {
            return 'error';
        }
    }
    toLocStorage(key) {
        const object = JSON.stringify(this.notes);
        localStorage.setItem( key, object);
    }
    // fromLocStorage(key) {
    //     const retObj = JSON.parse(localStorage.getItem(key));
    //     return retObj;
    // } почему линтер, если раскоментить, жалуеться на то, что нужен this? а если нужен то где и как..
}



class ToDo extends List {
    setNoteAsComplete(id) {
        const index = this.getNoteIndexById(id);
        this.notes[index].isComplete = true;
    }
    statistic() {
        return this.notes.reduce((acc, x) => {
            if (x.completed) {
                acc.completed++;
            } else {
                acc.incomplete++;
            }
            return acc;
        },
        {
            total: this.notes.length,
            completed: 0,
            incomplete: 0,
        });
    }
}

ToDo();
