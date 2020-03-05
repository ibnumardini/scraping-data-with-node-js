let axions = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

axions.get('http://members.qodr.or.id/')
    .then((response) => {
        // cek status
        if(response.status === 200){
            const html = response.data;
            // console.log(html);
            // menarik html dgn cheerio
            const $ = cheerio.load(html);
            // definisikan penyimpanan untuk array kita
            let qodrList = [];
            // target scraping dgn cheerio
            // scraping pertama dengan id (#) dan class (.)

            $('.fh5co-project a').each(function(i,elem){
                // mengisi data ke qodrLIst
                qodrList[i] = {
                    nama: $(this).find('h2').text().trim(),
                    status : $(this).find('p').text().trim()
                    // find itu untuk mencari
                    // text untuk memberi tahu ini sebuah text
                    // fungsi trims untuk memotong / menghilangkan spasi
                }
            });

            const qodrListTrim = qodrList.filter(n => n != undefined)
            fs.writeFile('data/dataSantri.json', JSON.stringify(qodrListTrim, null, 4), (err) => {
                console.log('write scraping is success.');
                
            })

        }
    }), (error) => console.log(err);
    