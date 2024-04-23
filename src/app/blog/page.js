const blog = () => {
    return ( <>
    <div className="main">
  <div className="sec">
    <div className="blog-cat">
      <ul>
        <li>
          <a href="#">Website Developement</a>
        </li>
        <li>
          <a href="#">Software Developement</a>
        </li>
        <li>
          <a href="#">Mobile App Developement</a>
        </li>
        <li>
          <a href="#">Digital Marketing</a>
        </li>
      </ul>
    </div>
    <div className="container">
      <div className="sec-hd">
        <h1>BLOG</h1>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="blog">
            <div className="blog-img">
              <a href="#">
                <img src="Brandin.png" alt="image" />
              </a>
              <h2>
                <a href="#">
                  Branding and Digital Marketing Strategies for Small
                  Businesses.
                </a>
              </h2>
              <div className="bttn">
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
          <div className="blog">
            <div className="blog-img">
              <a href="#">
                <img src="Local-SEO.png" alt="image" />
              </a>
              <h2>
                <a href="#">
                  Local SEO Demystified Winning Strategies for Small Business
                  Growth.
                </a>
              </h2>
              <div className="bttn">
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
          <div className="blog">
            <div className="blog-img">
              <a href="#">
                <img src="Web-Design.jpg" alt="image" />
              </a>
              <h2>
                <a href="#">
                  Digital Marketing and Website Development – A Dream Team Of
                  Successful Business.
                </a>
              </h2>
              <div className="bttn">
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
          <div className="blog">
            <div className="blog-img">
              <a href="#">
                <img src="website_structure.png" alt="image" />
              </a>
              <h2>
                <a href="#">
                  Step-by-step guide for building the ultimate website structure
                </a>
              </h2>
              <div className="bttn">
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
          <div className="blog">
            <div className="blog-img">
              <a href="#">
                <img src="blog4.png" alt="image" />
              </a>
              <h2>
                <a href="#">5 Factors Slowing Down Your Website and Fixes</a>
              </h2>
              <div className="bttn">
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 blog-search">
          <h2>Search Articles</h2>
          <form>
            <input type="text" placeholder="Search..." />
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

    
    </>);
}
 
export default blog;