class Calendar {
    constructor(id) {
        this.cells = [];
        this.selectedDate = null;
        this.elCalendar = document.getElementById(id);
        this.elText = document.getElementById('data');
        this.showTemplate();
        this.currentMonth = moment();
        this.gridBody =
        this.elCalendar.querySelector('.grid_body');
        this.MonthName =
        this.elCalendar.querySelector('.month-name');
        this.worships = this.ajaxGetReunion();
        this.showCells();
    }
    showTemplate() {
        this.elCalendar.innerHTML = this.getTemplate();
        this.addEventListenerToControls();

    }

    getTemplate() {
        let template = `
        <div class="calendar_header">
                <button type="button" class="control control--prev">&lt;</button>
                <span class="month-name"></span>
                <button type="button" class="control control--next">&gt;</button>
            </div>
            <div class="calendar_body"></div>
            <div class="grid">
                <div class="grid_header">
                    <span class="grid_cell grid_cell--gh">Lun</span>
                    <span class="grid_cell grid_cell--gh">Mar</span>
                    <span class="grid_cell grid_cell--gh">Mie</span>
                    <span class="grid_cell grid_cell--gh">Jue</span>
                    <span class="grid_cell grid_cell--gh">Vie</span>
                    <span class="grid_cell grid_cell--gh">Sab</span>
                    <span class="grid_cell grid_cell--gh">Dom</span>
                </div>
                <div class="grid_body">
                    
                </div>
            </div>
        `;
        return template;
    }

    addEventListenerToControls() {
        let elControls =
            this.elCalendar.querySelectorAll('.control');
        elControls.forEach(control => {
            control.addEventListener('click', e => {
                let elTarget = e.target;
                let next = false;
                if (elTarget.classList.contains('control--next')) {
                    next = true;
                }
                this.changeMonth(next);
                this.showCells();
            });
        });
    }

    ajaxGetReunion() {
        var result;
        $.ajax({
            url: 'https://localhost:44395/api/Reunion',
            type: 'GET',
            async: false
        }).done(function (data) {
            result = data;
        }).error(function (xhr, status, error) {
            alert(error);
            var s = status;
            var e = error;
        });
        return result;
    }//Trae las reuniones

    changeMonth(next = true) {
        if (next) {
            this.currentMonth.add(1, 'months');
        } else {
            this.currentMonth.subtract(1, 'months');
        }
    }

    generateDate(monthToShow = moment()) {
        if (!moment.isMoment(monthToShow)) {
            return null
        } else {
            let dateStart = moment(monthToShow).startOf('month');
            let dateEnd = moment(monthToShow).endOf('month');
            let cells = [];

            /*Encontrar la primer fecha */
            while (dateStart.day() !== 1) {
                dateStart.subtract(1, 'days');
            }

            /*Encontrar la ultima fecha*/
            while (dateEnd.day() !== 0) {
                dateEnd.add(1, 'days');
            }

            /*Genera las fechas del calendario!*/
            do {
                cells.push({
                    date: moment(dateStart),
                    isInCurrentMonth: dateStart.month() ===
                        monthToShow.month()
                });
                dateStart.add(1, 'days');
            } while (dateStart.isSameOrBefore(dateEnd));
            return cells;
        }
    }

    showCells() {
        this.cells = this.generateDate(this.currentMonth);
        if (this.cells === null) {
            console.error('No fue posible generar el calendario.');
            return null;
        }
        this.gridBody.innerHTML = "";
        let templateCells = "";
        let disableClass = '';
        let worshipClass = '';

        for (let i = 0; i < this.cells.length; i++) {
            disableClass = '';
            worshipClass = '';
            if (!this.cells[i].isInCurrentMonth) {
                disableClass = 'grid_cell--disabled';
            }
            for (var j = 0; j < this.worships.length; j++) {
                if (this.cells[i].date.format('LL') == this.worships[j].fecha) {
                    worshipClass = 'grid_cell--worship';
                }
            }
            templateCells += `
                <span class="grid_cell grid_cell--gd ${disableClass} ${worshipClass}"
                data-cell-id="${i}">
                ${this.cells[i].date.date()}</span>`;
        }
        this.MonthName.innerHTML = this.currentMonth.format('MMM YYYY');
        this.gridBody.innerHTML = templateCells;
        this.addEventListenerToCells();
    }// Muestra los días del mes

    addEventListenerToCells() {
        let Cells = this.elCalendar.querySelectorAll('.grid_cell--gd');

        Cells.forEach(cell => {
            cell.addEventListener('click', e => {
                let elTarget = e.target;
                if ((elTarget.classList.contains('grid_cell--disabled')) || (elTarget.classList.contains('grid_cell--selected'))) {
                    return;
                }
                let selectedCell = this.gridBody.querySelector('.grid_cell--selected');
                if (selectedCell) {
                    selectedCell.classList.remove('grid_cell--selected');
                }

                if (elTarget.classList.contains('grid_cell--worship')) {
                    this.writeMeet(this.cells[parseInt(elTarget.dataset.cellId)].date);
                } else {
                    let Data = this.elText.querySelector('.reu');
                    Data.innerHTML = "";
                }

                this.selectedDate = this.cells[parseInt(elTarget.dataset.cellId)].date;
                this.write(this.cells[parseInt(elTarget.dataset.cellId)].date);
               
                elTarget.classList.add('grid_cell--selected');
                this.elCalendar.dispatchEvent(new Event('change'));
            });
        });
    }// Pone eventos a los días del mes

    getElement() {
        return this.elCalendar;
    }

    value() {
        return this.selectedDate;
    }

    write(data = moment()) {
        let Data = this.elText.querySelector('.elData');
        Data.innerHTML = "";
        Data.textContent += data.format("MMM-DD-YYYY");
        var Muestra = $('#data');
        Muestra.val(data);
    }// Escribe la fecha

    writeMeet(data = moment) {
        var Data = $('.elWorship');
        Data.html("");
        for (var i = 0; i < this.worships.length; i++) {
            if (data.format('LL') == this.worships[i].fecha) {
                Data.append('<div class="tabla">Reunión a las ' + this.worships[i].hora + 
                    '<button type="button" id="reunion' + i + '" onclick="guardarReserva(this)"'
                    +'class= "btn_mini" > +</button ></div > ')
                var id = $('#reunion' + i);
                id.val(this.worships[i].nroReunion);
            }
        }
    }//Escribe la hora de la reunion

    guardarReserva() {

    }
}