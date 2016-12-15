function handleFileSelect(evt) {
                        var files = evt.target.files; //pliki
                        var id = 0;
                        //pętla wczytująca
                        for (var i = 0, f; f = files[i]; i++) {
                            if (!f.type.match('image.*')) { //sprwadzenie dla wczytywania wyłącznie zdjęć
                                continue;
                            }

                            var reader = new FileReader();

                            reader.onload = (function (theFile) {
                                return function (z) {
                                    var div = document.createElement('div'); //tworzymy diva do którego wstawiamy zdjęcie
                                    div.className = 'grid-item';
                                    div.draggable = 'true';
                                    div.innerHTML = ['<img class="grid-item-content" src="', z.target.result, '" title="" />'].join('');
                                    document.getElementById('gridId').insertBefore(div, null);
                                };
                            })(f);

                            reader.readAsDataURL(f);
                        }
                    }

                    document.getElementById('files').addEventListener('change', handleFileSelect, false);



