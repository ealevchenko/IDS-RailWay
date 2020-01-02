namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_ModelsWagons")]
    public partial class Directory_ModelsWagons
    {
        [Key]
        [StringLength(20)]
        public string code { get; set; }

        [Required]
        [StringLength(250)]
        public string model_ru { get; set; }

        [Required]
        [StringLength(250)]
        public string model_en { get; set; }
    }
}
