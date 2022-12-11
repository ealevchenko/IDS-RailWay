using EFIDS_Arhiv.Abstract;
using EFIDS_Arhiv.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Description;

namespace WEB_UI.Controllers.api.Arhiv
{
    [RoutePrefix("api/ids_arhiv/rwt/uz_doc_pdf")]
    public class UZ_DOC_PDF_Controller : ApiController
    {
        protected IStringRepository<UZ_DOC_PDF> ef_ids_arhiv;

        public UZ_DOC_PDF_Controller(IStringRepository<UZ_DOC_PDF> ids_arhiv)
        {
            this.ef_ids_arhiv = ids_arhiv;
        }

        // GET: api/ids_arhiv/rwt/uz_doc_pdf/pdf_file/num_doc/86854766
        [Route("pdf_file/num_doc/{num_doc}")]
        [ResponseType(typeof(byte[]))]
        public IHttpActionResult GetPDFOfNumDoc(string num_doc)
        {
            try
            {
                Byte[] pdf = null;
                UZ_DOC_PDF doc = this.ef_ids_arhiv
                    .Context
                    .Where(s => s.num_doc == num_doc)
                    .FirstOrDefault();
                if (doc != null)
                {
                    pdf = doc.pdf_doc;
                }

                //HttpResponseMessage response = new HttpResponseMessage(); //;charset=windows-1251

                //response.Content = new ByteArrayContent(pdf);
                //response.Content.LoadIntoBufferAsync(pdf.Length).Wait();
                //response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
                //return response;
                return Ok(pdf);

            }
            catch (Exception e)
            {
                return null; // BadRequest(e.Message);
            }
        }

        // GET: api/ids_arhiv/rwt/uz_doc_pdf/num_doc/86854766
        [Route("num_doc/{num_doc}")]
        [ResponseType(typeof(UZ_DOC_PDF))]
        public IHttpActionResult GetUZ_DOC_PDFOfNumDoc(string num_doc)
        {
            try
            {
                UZ_DOC_PDF doc = this.ef_ids_arhiv
                    .Context
                    .Where(s => s.num_doc == num_doc)
                    .FirstOrDefault();
                return Ok(doc);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
