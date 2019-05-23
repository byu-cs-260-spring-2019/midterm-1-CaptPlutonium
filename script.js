

var vue = new Vue ({

    el: "#app",
    data: {
        loading: true,
        bookName: '',
        bookList: [],
        SavedList: [],
    },
    computed: {

    },
    methods: {
        async searchBooks() {
            if (this.bookName == '') {
                return;
            }
            
            try {
                this.loading = true;
                
                const result1 = await axios.get("http://openlibrary.org/search.json?q=" + replaceSpace(this.bookName))

                console.log(result1);
                
                if (result1.data.docs.length == 0) {
                  
                }
                try {

                        const ISBN = result1.data.docs[1].isbn[0];
                        const rawBookData = await axios.get("https://openlibrary.org/api/books?bibkeys=ISBN:" + ISBN + "&jscmd=details&format=json");

                        const bookNum = "ISBN:" + ISBN;
                        const bookData = rawBookData.data[bookNum];
                        console.log(bookData);

                        var newBook = {
                             name: JSON.bookData.title,
                             bookAuthor: JSON.bookData.author,
                             isbnNum: ISBN,
                             img:JSON.bookData.thumbnail_url,
                            favorite: false
                        }

                        this.bookList.push(newBook);
                        this.SavedList.push(newBook);
                        
                    } catch (err) {
                        console.error(err);
                    }
                }
                catch (err) {
                console.error(err);
            }
            this.loading = false;
        }
    }
});

function replaceSpace(str) {
  return str.replace(' ', '+');
}