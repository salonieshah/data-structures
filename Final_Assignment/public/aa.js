  var html = '';

                for (var i=0; i<a.length; i++) {
                    if (i === 0) {
                        html += '<h3>' + data[i].name + '</h3>';
                        html += '<p>' + data[i].address + '</p>'
                            html += '<ul>'
                    }
                   
                    html += '<li>' + a[i].time
                }
                console.log(html)