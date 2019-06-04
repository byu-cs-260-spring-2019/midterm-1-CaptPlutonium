var app = new Vue({
    el: '#root',
    data : {
        inquiry: '',
        loading: true,
        ISBN: [],
        thumbnails: [],
        myBooks: [
        ],
    },
    // title, author, publish date, cover image

    created() {
        this.bookFind();    
    },
    methods: {
        async bookFind() {
            try{
                this.loading = true;
                const response = await axios.get('http://openlibrary.org/search.json?q=' + this.inquiry)
                const data = response.data;
                console.log(data);
                this.loading = false;
                for(var i = 0; i < data.docs.length; i++){


                    this.myBooks.push({title : data.docs[i].title_suggest, author : data.docs[i].author_name, publishDate : data.docs[i].first_publish_year, isbn: data.docs[i].isbn, thumbnail : '', favorite : false});
                    if(typeof this.myBooks[i].isbn !== 'undefined'){
                    this.ISBN = this.myBooks[i].isbn[0];
                    console.log(this.ISBN);
                    const response2 = await axios.get('https://openlibrary.org/api/books?bibkeys=ISBN:' + this.ISBN + '&jscmd=details&format=json')             
                    const url = response2.data['ISBN:'+this.ISBN].thumbnail_url;
                    console.log(url);
                    if(typeof url !== 'undefined'){
                        this.myBooks[i].thumbnail = url;
                    }
          
                    }

                  
                }
                
                
                return true;
            }
            
            catch(error){
                console.log(error);
                this.loading = false;
                return false;
            }
     
        },
        favoriteItem(item){
            var index = this.myBooks.indexOf(item);
            this.myBooks[index].favorite = true;

        },
        deleteItem(item){
            var index = this.myBooks.indexOf(item);
            this.myBooks[index].favorite = false;
        }

    },


});