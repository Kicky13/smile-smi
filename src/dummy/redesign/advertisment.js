const Advertisment = [
  {
    id: 1,
    advertism:
      "https://smile.semenindonesia.com/upload/gambar/20190206021820-FEBRUARI%20imlek.jpg"
  },
  {
    id: 2,
    advertism:
      "https://smile.semenindonesia.com/upload/gambar/20190118084649-NEWSLATER.jpg"
  },
  {
    id: 3,
    advertism:
      "https://smile.semenindonesia.com/upload/gambar/20190118084649-NEWSLATER.jpg"
  },
  {
    id: 1,
    advertism:
      "https://smile.semenindonesia.com/upload/gambar/20190206021820-FEBRUARI%20imlek.jpg"
  }
];

module.exports = {
  Advertisment
};

// {Bussiness.map((anObjectMapped, index) => {
//     return (
//       <div
//         key={anObjectMapped.id}
//         className="col-md-3 col-sm-3"
//       >
//         <div className="content-one-slidelima ">
//           <LazyLoad>
//             <ProgressiveImage
//               preview={anObjectMapped.lokasifoto}
//               src={anObjectMapped.lokasifoto}
//               render={(src, style) => (
//                 <img
//                   decoding="async"
//                   src={src}
//                   alt=""
//                   style={style}
//                 />
//               )}
//             />
//           </LazyLoad>

//           <div className="item-overlay top">
//             <p className="date-title">
//               {" "}
//               {anObjectMapped.tanggal}{" "}
//             </p>
//             <h5 className="date-title">
//               <b> {anObjectMapped.judul}</b>{" "}
//             </h5>
//             <br />
//             <p className="spoiler">
//               {" "}
//               &nbsp; {anObjectMapped.spoiler}{" "}
//             </p>
//             <br />
//             <NavLink href="/">
//               <Button className="button-overlay">
//                 <p>View more ...</p>
//               </Button>
//             </NavLink>
//           </div>
//         </div>
//       </div>
//     );
//   })}
