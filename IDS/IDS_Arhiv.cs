using EFIDS_Arhiv.Concrete;
using EFIDS_Arhiv.Entities;
using IDSLogs;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDS
{
    public class IDS_Arhiv : IDS_Base
    {
        private eventID eventID = eventID.IDS_Arhiv;
        private bool select_uz_info = false;

        public IDS_Arhiv()
            : base()
        {

        }

        public IDS_Arhiv(service servece_owner)
            : base(servece_owner)
        {

        }

        #region ОПЕРАЦИИ АРХИВИРОВАНИЯ ДОКУМЕНТОВ ЭПД (PDF)

        #endregion
        public int Update_UZ_DOC_PDF(UZ.UZ_DOC doc_uz, string user)
        {
            try
            {
                int res = 0;
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                if (doc_uz == null) return (int)errors_base.not_inp_uz_doc_db; // Нет входных данных

                EFDbContext context = new EFDbContext();
                UZ.UZ_SMS sms = new UZ.UZ_SMS(this.servece_owner);

                EFUZ_DOC_PDF ef_uz_doc_pdf = new EFUZ_DOC_PDF(context);

                UZ_DOC_PDF uz_doc_pdf = ef_uz_doc_pdf.Context.FirstOrDefault(d => d.num_doc == doc_uz.id_doc);
                if (uz_doc_pdf == null)
                {
                    //sms.Connection();
                    byte[] doc = sms.GetUZ_Document_Of_doc_id(doc_uz.id_doc);
                    uz_doc_pdf = new UZ_DOC_PDF
                    {
                        num_doc = doc_uz.id_doc,
                        revision = doc_uz.revision,
                        num_nakl = doc_uz.otpr.nom_doc != null ? doc_uz.otpr.nom_doc.ToString() : null,
                        output = doc_uz.sender_code == "7932" && doc_uz.sender_code != "7932" ? true : false,
                        pdf_doc = doc,
                        create = DateTime.Now,
                        create_user = user,
                    };
                    ef_uz_doc_pdf.Add(uz_doc_pdf);
                    Console.WriteLine("Добавил pdf-документ id_doc:{0}, № ревизии:{1}, № накладной:{2}, размер:{3} байт", uz_doc_pdf.num_doc, uz_doc_pdf.revision, uz_doc_pdf.num_nakl, doc.Count());
                }
                else
                {
                    if (uz_doc_pdf.revision < doc_uz.revision)
                    {
                        //sms.Connection();
                        byte[] doc = sms.GetUZ_Document_Of_doc_id(doc_uz.id_doc);
                        uz_doc_pdf.num_doc = doc_uz.id_doc;
                        uz_doc_pdf.revision = doc_uz.revision;
                        uz_doc_pdf.num_nakl = doc_uz.otpr.nom_doc != null ? doc_uz.otpr.nom_doc.ToString() : null;
                        uz_doc_pdf.pdf_doc = doc;
                        uz_doc_pdf.change = DateTime.Now;
                        uz_doc_pdf.change_user = user;
                        ef_uz_doc_pdf.Update(uz_doc_pdf);
                        Console.WriteLine("Обновил pdf-документ id_doc:{0}, № ревизии:{1}, № накладной:{2}, размер:{3} байт", uz_doc_pdf.num_doc, uz_doc_pdf.revision, uz_doc_pdf.num_nakl, doc.Count());
                    }
                    else
                    {
                        if (uz_doc_pdf.pdf_doc == null)
                        {
                            //sms.Connection();
                            byte[] doc = sms.GetUZ_Document_Of_doc_id(doc_uz.id_doc);
                            uz_doc_pdf.pdf_doc = doc;
                            uz_doc_pdf.change = DateTime.Now;
                            uz_doc_pdf.change_user = user;
                            ef_uz_doc_pdf.Update(uz_doc_pdf);
                            Console.WriteLine("Добавил pdf-документ id_doc:{0}, № ревизии:{1}, № накладной:{2}, размер:{3} байт", uz_doc_pdf.num_doc, uz_doc_pdf.revision, uz_doc_pdf.num_nakl, doc.Count());
                        }
                    }
                }

                if (uz_doc_pdf != null)
                {
                    if (context.Entry(uz_doc_pdf).State != System.Data.Entity.EntityState.Unchanged)
                    {
                        res = context.SaveChanges();
                    }
                }
                return res;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Update_UZ_DOC_PDF(doc_uz={0}, user={1})", (doc_uz != null ? doc_uz.id_doc : null), user), servece_owner, eventID);
                return (int)errors_base.global;// Ошибка
            }
        }
    }
}
